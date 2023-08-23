/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type AmbassadorCustomizer = CollectionCustomizer<Schema, 'ambassador'>;
export type AmbassadorRecord = TPartialRow<Schema, 'ambassador'>;
export type AmbassadorConditionTree = TConditionTree<Schema, 'ambassador'>;
export type AmbassadorFilter = TPaginatedFilter<Schema, 'ambassador'>;
export type AmbassadorSortClause = TSortClause<Schema, 'ambassador'>;
export type AmbassadorAggregation = TAggregation<Schema, 'ambassador'>;

export type EventCustomizer = CollectionCustomizer<Schema, 'event'>;
export type EventRecord = TPartialRow<Schema, 'event'>;
export type EventConditionTree = TConditionTree<Schema, 'event'>;
export type EventFilter = TPaginatedFilter<Schema, 'event'>;
export type EventSortClause = TSortClause<Schema, 'event'>;
export type EventAggregation = TAggregation<Schema, 'event'>;

export type LocationCustomizer = CollectionCustomizer<Schema, 'location'>;
export type LocationRecord = TPartialRow<Schema, 'location'>;
export type LocationConditionTree = TConditionTree<Schema, 'location'>;
export type LocationFilter = TPaginatedFilter<Schema, 'location'>;
export type LocationSortClause = TSortClause<Schema, 'location'>;
export type LocationAggregation = TAggregation<Schema, 'location'>;

export type ProgramCustomizer = CollectionCustomizer<Schema, 'program'>;
export type ProgramRecord = TPartialRow<Schema, 'program'>;
export type ProgramConditionTree = TConditionTree<Schema, 'program'>;
export type ProgramFilter = TPaginatedFilter<Schema, 'program'>;
export type ProgramSortClause = TSortClause<Schema, 'program'>;
export type ProgramAggregation = TAggregation<Schema, 'program'>;

export type UserCustomizer = CollectionCustomizer<Schema, 'user'>;
export type UserRecord = TPartialRow<Schema, 'user'>;
export type UserConditionTree = TConditionTree<Schema, 'user'>;
export type UserFilter = TPaginatedFilter<Schema, 'user'>;
export type UserSortClause = TSortClause<Schema, 'user'>;
export type UserAggregation = TAggregation<Schema, 'user'>;

export type UserWorkshopCustomizer = CollectionCustomizer<Schema, 'user_workshop'>;
export type UserWorkshopRecord = TPartialRow<Schema, 'user_workshop'>;
export type UserWorkshopConditionTree = TConditionTree<Schema, 'user_workshop'>;
export type UserWorkshopFilter = TPaginatedFilter<Schema, 'user_workshop'>;
export type UserWorkshopSortClause = TSortClause<Schema, 'user_workshop'>;
export type UserWorkshopAggregation = TAggregation<Schema, 'user_workshop'>;

export type WorkshopCustomizer = CollectionCustomizer<Schema, 'workshop'>;
export type WorkshopRecord = TPartialRow<Schema, 'workshop'>;
export type WorkshopConditionTree = TConditionTree<Schema, 'workshop'>;
export type WorkshopFilter = TPaginatedFilter<Schema, 'workshop'>;
export type WorkshopSortClause = TSortClause<Schema, 'workshop'>;
export type WorkshopAggregation = TAggregation<Schema, 'workshop'>;


export type Schema = {
  'ambassador': {
    plain: {
      'id': number;
      'firstname': string;
      'lastname': string;
      'email': string;
      'professional_phone': string;
      'picture': string;
      'birthdate': string;
      'manager_firstname': string;
      'manager_lastname': string;
      'manager_mail': string;
      'days_spent': number;
      'remaning_days': number;
      'professional_postal_code': string;
      'professional_city': string;
      'entity': 'communication' | 'brand_commitment' | 'digital';
      'do_zone': 'grand_ouest' | 'nord' | 'sud';
      'inerested_program_id': number;
      'comments': string;
      'address': string;
      'alternant': boolean;
      'animation_preferences': string;
      'created_at': string;
      'updated_at': string;
      'nbrWorkshop': number;
    };
    nested: {
      'inerested_program': Schema['program']['plain'] & Schema['program']['nested'];
    };
    flat: {
      'inerested_program:id': number;
      'inerested_program:name': string;
      'inerested_program:description': string;
      'inerested_program:owner_id': number;
      'inerested_program:created_at': string;
      'inerested_program:updated_at': string;
      'inerested_program:owner:id': number;
      'inerested_program:owner:firstname': string;
      'inerested_program:owner:lastname': string;
      'inerested_program:owner:email': string;
      'inerested_program:owner:birthdate': string;
      'inerested_program:owner:role': string;
      'inerested_program:owner:created_at': string;
      'inerested_program:owner:updated_at': string;
    };
  };
  'event': {
    plain: {
      'id': number;
      'name': string;
      'teaser': string;
      'program_id': number;
      'owner_id': number;
      'requirements': string;
      'price': number;
      'created_at': string;
      'updated_at': string;
    };
    nested: {
      'program': Schema['program']['plain'] & Schema['program']['nested'];
      'owner': Schema['user']['plain'] & Schema['user']['nested'];
    };
    flat: {
      'program:id': number;
      'program:name': string;
      'program:description': string;
      'program:owner_id': number;
      'program:created_at': string;
      'program:updated_at': string;
      'program:owner:id': number;
      'program:owner:firstname': string;
      'program:owner:lastname': string;
      'program:owner:email': string;
      'program:owner:birthdate': string;
      'program:owner:role': string;
      'program:owner:created_at': string;
      'program:owner:updated_at': string;
      'owner:id': number;
      'owner:firstname': string;
      'owner:lastname': string;
      'owner:email': string;
      'owner:birthdate': string;
      'owner:role': string;
      'owner:created_at': string;
      'owner:updated_at': string;
    };
  };
  'location': {
    plain: {
      'id': number;
      'country': string;
      'city': string;
      'number': string;
      'street': string;
      'picture': string;
      'capacity': number;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'program': {
    plain: {
      'id': number;
      'name': string;
      'description': string;
      'owner_id': number;
      'created_at': string;
      'updated_at': string;
    };
    nested: {
      'owner': Schema['user']['plain'] & Schema['user']['nested'];
    };
    flat: {
      'owner:id': number;
      'owner:firstname': string;
      'owner:lastname': string;
      'owner:email': string;
      'owner:birthdate': string;
      'owner:role': string;
      'owner:created_at': string;
      'owner:updated_at': string;
    };
  };
  'user': {
    plain: {
      'id': number;
      'firstname': string;
      'lastname': string;
      'email': string;
      'birthdate': string;
      'role': string;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'user_workshop': {
    plain: {
      'id': number;
      'user_id': number;
      'workshop_id': number;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
  };
  'workshop': {
    plain: {
      'id': number;
      'name': string;
      'type': 'online' | 'on-site';
      'status': 'pending-review' | 'confirmed';
      'description': string;
      'ambassador_id': number;
      'location_id': number;
      'event_id': number;
      'observator_id': number;
      'occurring_date': string;
      'created_at': string;
      'updated_at': string;
      'ambassador_check': string;
      'programId': number;
    };
    nested: {
      'ambassador': Schema['ambassador']['plain'] & Schema['ambassador']['nested'];
      'location': Schema['location']['plain'] & Schema['location']['nested'];
      'event': Schema['event']['plain'] & Schema['event']['nested'];
      'observator': Schema['ambassador']['plain'] & Schema['ambassador']['nested'];
      'program': Schema['program']['plain'] & Schema['program']['nested'];
    };
    flat: {
      'ambassador:id': number;
      'ambassador:firstname': string;
      'ambassador:lastname': string;
      'ambassador:email': string;
      'ambassador:professional_phone': string;
      'ambassador:picture': string;
      'ambassador:birthdate': string;
      'ambassador:manager_firstname': string;
      'ambassador:manager_lastname': string;
      'ambassador:manager_mail': string;
      'ambassador:days_spent': number;
      'ambassador:remaning_days': number;
      'ambassador:professional_postal_code': string;
      'ambassador:professional_city': string;
      'ambassador:entity': 'communication' | 'brand_commitment' | 'digital';
      'ambassador:do_zone': 'grand_ouest' | 'nord' | 'sud';
      'ambassador:inerested_program_id': number;
      'ambassador:comments': string;
      'ambassador:address': string;
      'ambassador:alternant': boolean;
      'ambassador:animation_preferences': string;
      'ambassador:created_at': string;
      'ambassador:updated_at': string;
      'ambassador:nbrWorkshop': number;
      'ambassador:inerested_program:id': number;
      'ambassador:inerested_program:name': string;
      'ambassador:inerested_program:description': string;
      'ambassador:inerested_program:owner_id': number;
      'ambassador:inerested_program:created_at': string;
      'ambassador:inerested_program:updated_at': string;
      'ambassador:inerested_program:owner:id': number;
      'ambassador:inerested_program:owner:firstname': string;
      'ambassador:inerested_program:owner:lastname': string;
      'ambassador:inerested_program:owner:email': string;
      'ambassador:inerested_program:owner:birthdate': string;
      'ambassador:inerested_program:owner:role': string;
      'ambassador:inerested_program:owner:created_at': string;
      'ambassador:inerested_program:owner:updated_at': string;
      'location:id': number;
      'location:country': string;
      'location:city': string;
      'location:number': string;
      'location:street': string;
      'location:picture': string;
      'location:capacity': number;
      'location:created_at': string;
      'location:updated_at': string;
      'event:id': number;
      'event:name': string;
      'event:teaser': string;
      'event:program_id': number;
      'event:owner_id': number;
      'event:requirements': string;
      'event:price': number;
      'event:created_at': string;
      'event:updated_at': string;
      'event:program:id': number;
      'event:program:name': string;
      'event:program:description': string;
      'event:program:owner_id': number;
      'event:program:created_at': string;
      'event:program:updated_at': string;
      'event:program:owner:id': number;
      'event:program:owner:firstname': string;
      'event:program:owner:lastname': string;
      'event:program:owner:email': string;
      'event:program:owner:birthdate': string;
      'event:program:owner:role': string;
      'event:program:owner:created_at': string;
      'event:program:owner:updated_at': string;
      'event:owner:id': number;
      'event:owner:firstname': string;
      'event:owner:lastname': string;
      'event:owner:email': string;
      'event:owner:birthdate': string;
      'event:owner:role': string;
      'event:owner:created_at': string;
      'event:owner:updated_at': string;
      'observator:id': number;
      'observator:firstname': string;
      'observator:lastname': string;
      'observator:email': string;
      'observator:professional_phone': string;
      'observator:picture': string;
      'observator:birthdate': string;
      'observator:manager_firstname': string;
      'observator:manager_lastname': string;
      'observator:manager_mail': string;
      'observator:days_spent': number;
      'observator:remaning_days': number;
      'observator:professional_postal_code': string;
      'observator:professional_city': string;
      'observator:entity': 'communication' | 'brand_commitment' | 'digital';
      'observator:do_zone': 'grand_ouest' | 'nord' | 'sud';
      'observator:inerested_program_id': number;
      'observator:comments': string;
      'observator:address': string;
      'observator:alternant': boolean;
      'observator:animation_preferences': string;
      'observator:created_at': string;
      'observator:updated_at': string;
      'observator:nbrWorkshop': number;
      'observator:inerested_program:id': number;
      'observator:inerested_program:name': string;
      'observator:inerested_program:description': string;
      'observator:inerested_program:owner_id': number;
      'observator:inerested_program:created_at': string;
      'observator:inerested_program:updated_at': string;
      'observator:inerested_program:owner:id': number;
      'observator:inerested_program:owner:firstname': string;
      'observator:inerested_program:owner:lastname': string;
      'observator:inerested_program:owner:email': string;
      'observator:inerested_program:owner:birthdate': string;
      'observator:inerested_program:owner:role': string;
      'observator:inerested_program:owner:created_at': string;
      'observator:inerested_program:owner:updated_at': string;
      'program:id': number;
      'program:name': string;
      'program:description': string;
      'program:owner_id': number;
      'program:created_at': string;
      'program:updated_at': string;
      'program:owner:id': number;
      'program:owner:firstname': string;
      'program:owner:lastname': string;
      'program:owner:email': string;
      'program:owner:birthdate': string;
      'program:owner:role': string;
      'program:owner:created_at': string;
      'program:owner:updated_at': string;
    };
  };
};
