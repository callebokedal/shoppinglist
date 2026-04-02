/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {string} name
 * @property {string} unit - e.g. "st", "kg", "l"
 * @property {string|null} categoryId - References Category.id, or null
 * @property {string|null} lastBought - ISO 8601 date string or null
 * @property {number} createdAt - Unix timestamp (ms)
 */

/**
 * @typedef {Object} Store
 * @property {string} id
 * @property {string} name
 * @property {string[]} itemOrder - Ordered array of Item IDs (defines aisle/section order)
 * @property {string[]} categoryIds - Which categories this store carries
 * @property {number} createdAt - Unix timestamp (ms)
 */

/**
 * @typedef {Object} ShoppingList
 * @property {string} id
 * @property {string} name
 * @property {string|null} storeId - Which store is selected for this list
 * @property {number} createdAt - Unix timestamp (ms)
 */

/**
 * @typedef {Object} ShoppingListEntry
 * @property {string} id
 * @property {string} listId - References ShoppingList.id
 * @property {string} itemId - References Item.id
 * @property {number} quantity
 * @property {boolean} completed
 * @property {number} addedAt - Unix timestamp (ms)
 */

/**
 * @typedef {Object} PurchaseRecord
 * @property {string} id
 * @property {string} itemId
 * @property {number} quantity
 * @property {string} date - ISO 8601 date string
 */

/**
 * @typedef {Object} ActionLogEntry
 * @property {string} id
 * @property {string} type - e.g. "ADD_TO_LIST", "TOGGLE_COMPLETE"
 * @property {string} description - i18n translation key
 * @property {Object} [params] - Interpolation params for translation
 * @property {number} timestamp - Unix timestamp (ms)
 * @property {boolean} undoable
 * @property {Object} snapshot - State slice before the action (for undo)
 */

export const DEFAULT_STORE_ID = '__default__'
export const DEFAULT_LIST_ID = '__default_list__'
