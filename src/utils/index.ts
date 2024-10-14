import { JSONPath } from 'jsonpath-plus';
import { isEmpty, set } from 'lodash';

export function extractInitials(fullName: string) {
  const names = fullName.trim().split(/\s+/);

  let firstInitial = '';
  let lastInitial = '';

  if (names.length > 0) {
    firstInitial = names[0].charAt(0).toUpperCase();
  }

  if (names.length > 1) {
    let lastNameIndex = names.length - 1;

    for (let i = names.length - 1; i > 0; i--) {
      if (names[i].charAt(0) === '(') {
        lastNameIndex = i - 1;
        break;
      }
    }
    lastInitial = names[lastNameIndex].charAt(0).toUpperCase();
  }

  return `${lastInitial}${firstInitial}`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type JSONObject = { [key: string]: any };

interface MarkUpdatedFieldsResult {
  result: JSONObject;
  isUpdated: boolean;
}

function markUpdatedFields(
  original: JSONObject,
  updated: JSONObject,
  parentKey: string = '',
  parentResult: JSONObject | null = null,
  rootResult: JSONObject | null = null
): MarkUpdatedFieldsResult {
  let result: JSONObject = {};
  let isUpdated = false;

  for (let key in updated) {
    if (updated.hasOwnProperty(key)) {
      if (Array.isArray(updated[key])) {
        // Handle arrays
        result[key] = [];
        let originalArray = original[key] || [];
        let updatedArray = updated[key];
        let arrayUpdated = false;

        // Process elements in the updated array
        for (let i = 0; i < updatedArray.length; i++) {
          let originalElement = originalArray[i] || {};
          let updatedElement = updatedArray[i];
          if (typeof updatedElement === 'object' && updatedElement !== null) {
            let childResult = markUpdatedFields(
              originalElement,
              updatedElement,
              key,
              result,
              rootResult
            );
            result[key].push(childResult.result);
            if (childResult.isUpdated) {
              arrayUpdated = true;
            }
          } else if (updatedElement !== originalElement) {
            result[key].push(updatedElement);
            arrayUpdated = true;
          } else {
            result[key].push(updatedElement);
          }
        }

        // Check for removed elements in the original array
        if (originalArray.length !== updatedArray.length) {
          arrayUpdated = true;
        }

        if (arrayUpdated) {
          isUpdated = true;
          result[`is${capitalize(key)}Updated`] = 'Yes';
          if (parentResult !== null) {
            parentResult[`is${capitalize(parentKey)}Updated`] = 'Yes';
          }
          if (rootResult !== null) {
            rootResult['isUpdated'] = 'Yes';
          }
        }
      } else if (typeof updated[key] === 'object' && updated[key] !== null) {
        // Handle nested objects
        let childResult = markUpdatedFields(
          original[key] || {},
          updated[key],
          key,
          result,
          rootResult
        );
        result[key] = childResult.result;
        if (childResult.isUpdated) {
          isUpdated = true;
          if (parentResult !== null) {
            parentResult[`is${capitalize(parentKey)}Updated`] = 'Yes';
          }
          if (rootResult !== null) {
            rootResult['isUpdated'] = 'Yes';
          }
        }
      } else if (
        !key.startsWith('is') &&
        !key.endsWith('Updated') &&
        updated[key] !== original[key]
      ) {
        result[`is${capitalize(key)}Updated`] = 'Yes';
        result[key] = updated[key];
        isUpdated = true;
        if (parentResult !== null) {
          parentResult[`is${capitalize(parentKey)}Updated`] = 'Yes';
        }
        if (rootResult !== null) {
          rootResult['isUpdated'] = 'Yes';
        }
      } else {
        if (result[key] !== 'Yes' && !key.endsWith('Updated')) {
          result[key] = updated[key];
        }
      }
    }
  }
  return { result, isUpdated };
}

export function updateJSON(
  original: JSONObject,
  updated: JSONObject
): JSONObject {
  let rootResult: JSONObject = {};
  let { result } = markUpdatedFields(original, updated, '', null, rootResult);
  const updatedPayload = { ...result, ...rootResult };
  return updatedPayload;
}

// Queries and updates JSON using `json-query`
export function queryAndUpdateJSON(
  object: any,
  query: string,
  targetFields: Array<{ field: string; value: string }>
) {
  const paths: Array<string> = JSONPath({
    path: query,
    json: object,
    resultType: 'path',
  });
  paths.forEach((path) => {
    const lodashPath = jsonPathToLodashPath(path);
    targetFields.forEach((field) => {
      set(object, [...lodashPath, ...field.field.split('.')], field.value);
    });
  });
  return object;
}
export function queryAndResetJSON(
  original: any,
  updated: any,
  query: string,
  fields?: Array<string>
) {
  const originalMatches = JSONPath({
    path: query,
    json: original,
    resultType: 'path',
  });

  const updatedMatches = JSONPath({ path: query, json: updated });

  if (!originalMatches.length || !updatedMatches.length) {
    console.warn('No matching data found for the query.');
    return updated;
  }

  originalMatches.forEach((originalPath: any) => {
    const originalValue = JSONPath({
      path: originalPath,
      json: original,
      resultType: 'value',
    });
    const path = jsonPathToLodashPath(originalPath);
    if (path) {
      if (!isEmpty(fields)) {
        fields?.forEach((field) => {
          set(updated, `${path}.${field}`, originalValue[0]?.[field]);
        });
      } else set(updated, path, originalValue[0]);
    }
  });
  return updated;
}

function jsonPathToLodashPath(jsonPath: string) {
  return jsonPath
    .replace(/^\$/, '')
    .split(/\.|\['|'\]|\[|\]/)
    .filter(Boolean);
}

export function removeLeadingZeros(value: string) {
  return value?.replace(/^0+/, '');
}
