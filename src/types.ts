export interface AppManifest {
  name: string;
  url: string;
  description: string;
  titleBar?: boolean;
  icon?: string;
}

export interface App {
  manifest: AppManifest;
  icon: string | null;
  cleanup?: () => void;
}
