export interface AppManifest {
  name: string;
  url: string;
  icon?: string;
}

export interface App {
  manifest: AppManifest;
  icon: string | null;
  cleanup: () => void;
}
