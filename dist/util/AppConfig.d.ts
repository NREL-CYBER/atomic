import AppRoute from "../routing/AppRoute";
import { Glossary } from "../components/guidance/AppGlossary";
import { RootSchemaObject } from "validator";
import { CompletionCondition } from "../hooks/useCompletion";
export interface AppConfig {
    rootRoute: AppRoute;
    sections: Record<string, AppRoute[]>;
    schemas: RootSchemaObject[];
    completion: Record<string, CompletionCondition>;
    glossary?: Glossary;
}
