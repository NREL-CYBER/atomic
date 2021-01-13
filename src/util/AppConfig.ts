import AppRoute from "../routing/AppRoute";

export interface AppConfig {
    topBar?: React.FC
    sections?: Record<string, AppRoute[]>
    rootRoute: AppRoute
    bottomBar?: React.FC
}
