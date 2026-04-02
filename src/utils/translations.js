export const translations = {
  sv: {
    // Navigation
    'nav.list': 'Lista',
    'nav.stores': 'Butiker',
    'nav.items': 'Varor',
    'nav.statistics': 'Statistik',
    'nav.settings': 'Inställningar',

    // Import
    'import.button': 'Importera',
    'import.title': 'Importera varor',
    'import.hint': 'En vara per rad. Format: namn, enhet, kategori\nEnhet och kategori är valfria. Okänd kategori ignoreras.',
    'import.placeholder': 'Mjölk\nBröd, st\nSpik, st, Bygg\nJeans, st, Kläder',
    'import.doImport': 'Importera',
    'import.preview': 'Förhandsgranskning ({count} varor)',
    'import.ignoredCategory': 'okänd kategori ignoreras',

    // Lists
    'lists.addList': 'Ny lista',
    'lists.newListName': 'Ny lista',
    'lists.deleteConfirm': 'Ta bort "{name}"?',
    'lists.deleteWarning': 'Alla varor i listan tas bort.',
    'lists.rename': 'Byt namn',

    // Shopping List page
    'list.title': 'Inköpslista',
    'list.noStore': 'Ingen butik',
    'list.selectStore': 'Välj butik',
    'list.addPlaceholder': 'Lägg till vara...',
    'list.addButton': 'Lägg till',
    'list.empty': 'Listan är tom',
    'list.emptyHint': 'Skriv en vara ovan för att komma igång',
    'list.clearCompleted': 'Rensa klara',
    'list.qty': 'Antal',
    'list.newItem': 'Ny vara: {name}',

    // Categories
    'categories.title': 'Kategorier',
    'categories.add': 'Lägg till kategori',
    'categories.namePlaceholder': 'Kategorinamn (t.ex. Mat, Bygg)',
    'categories.empty': 'Inga kategorier',
    'categories.emptyHint': 'Lägg till kategorier som Mat, Bygg, Kläder...',
    'categories.deleteConfirm': 'Ta bort "{name}"?',
    'categories.deleteWarning': 'Varor med denna kategori blir okategoriserade.',
    'categories.noCategory': 'Ingen kategori',
    'categories.storeFilter': 'Visar: {names}',
    'categories.allItems': 'Alla varor',
    'categories.storeCategoriesLabel': 'Butikstyper (kategorier)',
    'categories.itemCategoryLabel': 'Kategori',

    // Stores page
    'stores.title': 'Butiker',
    'stores.add': 'Lägg till butik',
    'stores.edit': 'Redigera butik',
    'stores.delete': 'Ta bort butik',
    'stores.namePlaceholder': 'Butiksnamn',
    'stores.empty': 'Inga butiker',
    'stores.emptyHint': 'Lägg till en butik för att spåra varornas ordning',
    'stores.deleteConfirm': 'Ta bort "{name}"?',
    'stores.deleteWarning': 'Varorna behåller sin ordning men kopplingen till butiken tas bort.',
    'stores.itemCount': '{count} varor i ordning',

    // Items page
    'items.title': 'Varor',
    'items.add': 'Lägg till vara',
    'items.edit': 'Redigera vara',
    'items.delete': 'Ta bort vara',
    'items.namePlaceholder': 'Varunamn',
    'items.unitPlaceholder': 'Enhet (st, kg, l...)',
    'items.lastBought': 'Senast köpt',
    'items.never': 'Aldrig',
    'items.empty': 'Inga varor',
    'items.emptyHint': 'Varor skapas automatiskt när du lägger till dem i listan',
    'items.deleteConfirm': 'Ta bort "{name}"?',
    'items.deleteWarning': 'Varan tas bort från alla butiker och historik.',
    'items.unit': 'Enhet',

    // Statistics page
    'stats.title': 'Statistik',
    'stats.totalPurchases': 'Totalt inköp',
    'stats.uniqueItems': 'Unika varor',
    'stats.topItems': 'Vanligast köpta',
    'stats.frequency': 'Köpfrekvens per vecka',
    'stats.empty': 'Ingen statistik ännu',
    'stats.emptyHint': 'Börja handla för att se statistik',
    'stats.times': '{count} ggr',

    // Settings page
    'settings.title': 'Inställningar',
    'settings.language': 'Språk',
    'settings.languageSv': 'Svenska',
    'settings.languageEn': 'English',

    // Action log
    'log.title': 'Händelselogg',
    'log.empty': 'Inga händelser',
    'log.close': 'Stäng',

    // Actions (for log descriptions)
    'action.addedToList': 'Lade till {itemName} i listan',
    'action.removedFromList': 'Tog bort {itemName} från listan',
    'action.toggleComplete': 'Markerade {itemName} som {state}',
    'action.completedState': 'klar',
    'action.uncompletedState': 'oklar',
    'action.clearCompleted': 'Rensade klara varor',
    'action.reorder': 'Ändrade ordning i {storeName}',
    'action.addItem': 'Skapade vara {itemName}',
    'action.updateItem': 'Uppdaterade vara {itemName}',
    'action.deleteItem': 'Tog bort vara {itemName}',
    'action.addStore': 'Skapade butik {storeName}',
    'action.updateStore': 'Uppdaterade butik {storeName}',
    'action.deleteStore': 'Tog bort butik {storeName}',
    'action.undo': 'Ångrade: {description}',

    // Undo toast
    'undo.button': 'Ångra',
    'undo.canUndo': 'Kan ångra',

    // Common
    'common.save': 'Spara',
    'common.cancel': 'Avbryt',
    'common.delete': 'Ta bort',
    'common.edit': 'Redigera',
    'common.add': 'Lägg till',
    'common.confirm': 'Bekräfta',
    'common.defaultStore': 'Standardordning',
  },

  en: {
    // Navigation
    'nav.list': 'List',
    'nav.stores': 'Stores',
    'nav.items': 'Items',
    'nav.statistics': 'Statistics',
    'nav.settings': 'Settings',

    // Import
    'import.button': 'Import',
    'import.title': 'Import items',
    'import.hint': 'One item per line. Format: name, unit, category\nUnit and category are optional. Unknown categories are ignored.',
    'import.placeholder': 'Milk\nBread, pcs\nNails, pcs, Hardware\nJeans, pcs, Clothing',
    'import.doImport': 'Import',
    'import.preview': 'Preview ({count} items)',
    'import.ignoredCategory': 'unknown category ignored',

    // Lists
    'lists.addList': 'New list',
    'lists.newListName': 'New list',
    'lists.deleteConfirm': 'Delete "{name}"?',
    'lists.deleteWarning': 'All items in this list will be removed.',
    'lists.rename': 'Rename',

    // Shopping List page
    'list.title': 'Shopping List',
    'list.noStore': 'No store',
    'list.selectStore': 'Select store',
    'list.addPlaceholder': 'Add item...',
    'list.addButton': 'Add',
    'list.empty': 'List is empty',
    'list.emptyHint': 'Type an item above to get started',
    'list.clearCompleted': 'Clear done',
    'list.qty': 'Qty',
    'list.newItem': 'New item: {name}',

    // Categories
    'categories.title': 'Categories',
    'categories.add': 'Add category',
    'categories.namePlaceholder': 'Category name (e.g. Food, Hardware)',
    'categories.empty': 'No categories',
    'categories.emptyHint': 'Add categories like Food, Hardware, Clothing...',
    'categories.deleteConfirm': 'Delete "{name}"?',
    'categories.deleteWarning': 'Items in this category will become uncategorized.',
    'categories.noCategory': 'No category',
    'categories.storeFilter': 'Showing: {names}',
    'categories.allItems': 'All items',
    'categories.storeCategoriesLabel': 'Store types (categories)',
    'categories.itemCategoryLabel': 'Category',

    // Stores page
    'stores.title': 'Stores',
    'stores.add': 'Add store',
    'stores.edit': 'Edit store',
    'stores.delete': 'Delete store',
    'stores.namePlaceholder': 'Store name',
    'stores.empty': 'No stores',
    'stores.emptyHint': 'Add a store to track item order by aisle',
    'stores.deleteConfirm': 'Delete "{name}"?',
    'stores.deleteWarning': 'Items keep their order but the store link is removed.',
    'stores.itemCount': '{count} items in order',

    // Items page
    'items.title': 'Items',
    'items.add': 'Add item',
    'items.edit': 'Edit item',
    'items.delete': 'Delete item',
    'items.namePlaceholder': 'Item name',
    'items.unitPlaceholder': 'Unit (pcs, kg, l...)',
    'items.lastBought': 'Last bought',
    'items.never': 'Never',
    'items.empty': 'No items',
    'items.emptyHint': 'Items are created automatically when you add them to the list',
    'items.deleteConfirm': 'Delete "{name}"?',
    'items.deleteWarning': 'The item will be removed from all stores and history.',
    'items.unit': 'Unit',

    // Statistics page
    'stats.title': 'Statistics',
    'stats.totalPurchases': 'Total purchases',
    'stats.uniqueItems': 'Unique items',
    'stats.topItems': 'Most bought',
    'stats.frequency': 'Purchase frequency per week',
    'stats.empty': 'No statistics yet',
    'stats.emptyHint': 'Start shopping to see statistics',
    'stats.times': '{count}×',

    // Settings page
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.languageSv': 'Svenska',
    'settings.languageEn': 'English',

    // Action log
    'log.title': 'Action Log',
    'log.empty': 'No actions',
    'log.close': 'Close',

    // Actions (for log descriptions)
    'action.addedToList': 'Added {itemName} to list',
    'action.removedFromList': 'Removed {itemName} from list',
    'action.toggleComplete': 'Marked {itemName} as {state}',
    'action.completedState': 'done',
    'action.uncompletedState': 'undone',
    'action.clearCompleted': 'Cleared completed items',
    'action.reorder': 'Changed order in {storeName}',
    'action.addItem': 'Created item {itemName}',
    'action.updateItem': 'Updated item {itemName}',
    'action.deleteItem': 'Deleted item {itemName}',
    'action.addStore': 'Created store {storeName}',
    'action.updateStore': 'Updated store {storeName}',
    'action.deleteStore': 'Deleted store {storeName}',
    'action.undo': 'Undid: {description}',

    // Undo toast
    'undo.button': 'Undo',
    'undo.canUndo': 'Can undo',

    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.confirm': 'Confirm',
    'common.defaultStore': 'Default order',
  },
}

/**
 * Interpolate {key} placeholders in a translation string.
 * @param {string} str
 * @param {Record<string, string|number>} [params]
 * @returns {string}
 */
export function interpolate(str, params) {
  if (!params) return str
  return str.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`))
}
