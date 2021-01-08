import React from 'react';
export declare type GlossaryDefinition = string;
export interface Glossary {
    records: Record<string, GlossaryDefinition>;
}
interface glossaryParams {
    glossary: Glossary;
}
declare const AppGlossary: React.FC<glossaryParams>;
export default AppGlossary;
