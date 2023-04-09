export type TFetchRequest = {
  data: Array<Object>;
  meta: {
    pagination: {
      count: number;
      limit: number;
      offset: number;
      pages: number;
    };
    schema: TSchema;
    tableTitles: {
      key: string;
      name: string;
    };
  };
};

export type TSchema = {
  [key: string]: TSchemaField;
};

type TSchemaField = {
  key: string;
  name: string;
  type: TFieldType;
  modality: TFieldModality;
  readonly: boolean;
};

type TFieldType = 'string' | 'integer' | 'float' | 'date' | 'array' | 'boolean' | 'object';
type TFieldModality = 'optional' | 'expected' | 'required';
