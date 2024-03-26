type ExtractElementType<ArrType> =
  ArrType extends readonly (infer ElementType)[] ? ElementType : never;

export type { ExtractElementType };
