export type TSharedResourceType = 'Task' | 'Course';

export type TSharedResource = {
  protected: boolean;
  ['allow_login']: boolean;
  ['creator_id']: string;
  code: string;
  ['resource_id']: string;
  ['resource_type']: TSharedResourceType;
  ['target_role']: 'student';
  resource: {
    ['share_id']: string;
  };
  ['resource_id']: string;
};
