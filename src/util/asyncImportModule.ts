export async function asyncImportModule(moduleName: string): Promise<any> {
    const importedModule = await import(moduleName);
    return importedModule;
}
