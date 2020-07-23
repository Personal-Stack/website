export interface Gist {
  url: string;
  id: string;
  files: IGistFile[];
  user?: null;
  truncated: boolean;
}

export interface IGistFile {
  name: string;
  text: string;
  language: {
    name: string;
  };
}
