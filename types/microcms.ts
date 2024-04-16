export type News = {
  contents: [
    {
      id: string;
      title: string;
      content: string;
      createdAt: string;
      publishedAt: string;
      revisedAt: string;
      updatedAt: string;
    }
  ];
  totalCount: number;
};
