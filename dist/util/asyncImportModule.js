export async function asyncImportModule(moduleName) {
  const importedModule = await import(moduleName);
  return importedModule;
}