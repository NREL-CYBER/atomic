/// <reference types="react" />
import { AppRoute } from "..";
import { AppCacheIndex } from "../state/AppCacheIndex";
export interface AppConfig {
    topBar?: React.FC;
    sections?: Record<string, AppRoute[]>;
    routes: AppRoute[];
    cache: AppCacheIndex;
    bottomBar?: React.FC;
}
