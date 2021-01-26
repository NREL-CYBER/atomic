/// <reference types="react" />
import { AppRoute } from "..";
import { AppCacheIndex } from "../state/AppCacheIndex";
export interface AppConfig {
    topBar?: React.FC;
    sections?: Record<string, AppRoute[]>;
    routes: AppRoute[];
    preload: (cache: AppCacheIndex) => void;
    cache: AppCacheIndex;
    bottomBar?: React.FC;
    darkMode?: boolean;
}
