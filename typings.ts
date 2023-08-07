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

export type LocationCustomizer = CollectionCustomizer<Schema, 'location'>;
export type LocationRecord = TPartialRow<Schema, 'location'>;
export type LocationConditionTree = TConditionTree<Schema, 'location'>;
export type LocationFilter = TPaginatedFilter<Schema, 'location'>;
export type LocationSortClause = TSortClause<Schema, 'location'>;
export type LocationAggregation = TAggregation<Schema, 'location'>;

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
      'picture': string;
      'birthdate': string;
      'created_at': string;
      'updated_at': string;
    };
    nested: {};
    flat: {};
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
  'user': {
    plain: {
      'id': number;
      'firstname': string;
      'lastname': string;
      'email': string;
      'workshop_id': number;
      'birthdate': string;
      'created_at': string;
      'updated_at': string;
    };
    nested: {
      'workshop': Schema['workshop']['plain'] & Schema['workshop']['nested'];
    };
    flat: {
      'workshop:id': number;
      'workshop:name': string;
      'workshop:type': 'online' | 'on-site';
      'workshop:status': 'pending-review' | 'confirmed';
      'workshop:description': string;
      'workshop:ambassador_id': number;
      'workshop:location_id': number;
      'workshop:occurring_date': string;
      'workshop:created_at': string;
      'workshop:updated_at': string;
      'workshop:ambassador_check': string;
      'workshop:ambassador:id': number;
      'workshop:ambassador:firstname': string;
      'workshop:ambassador:lastname': string;
      'workshop:ambassador:email': string;
      'workshop:ambassador:picture': string;
      'workshop:ambassador:birthdate': string;
      'workshop:ambassador:created_at': string;
      'workshop:ambassador:updated_at': string;
      'workshop:location:id': number;
      'workshop:location:country': string;
      'workshop:location:city': string;
      'workshop:location:number': string;
      'workshop:location:street': string;
      'workshop:location:picture': string;
      'workshop:location:capacity': number;
      'workshop:location:created_at': string;
      'workshop:location:updated_at': string;
    };
  };
  'user_workshop': {
    plain: {
      'id': number;
      'user_id': number;
      'workshop_id': number;
      'created_at': string;
      'updated_at': string;
    };
    nested: {
      'user': Schema['user']['plain'] & Schema['user']['nested'];
      'workshop': Schema['workshop']['plain'] & Schema['workshop']['nested'];
    };
    flat: {
      'user:id': number;
      'user:firstname': string;
      'user:lastname': string;
      'user:email': string;
      'user:workshop_id': number;
      'user:birthdate': string;
      'user:created_at': string;
      'user:updated_at': string;
      'user:workshop:id': number;
      'user:workshop:name': string;
      'user:workshop:type': 'online' | 'on-site';
      'user:workshop:status': 'pending-review' | 'confirmed';
      'user:workshop:description': string;
      'user:workshop:ambassador_id': number;
      'user:workshop:location_id': number;
      'user:workshop:occurring_date': string;
      'user:workshop:created_at': string;
      'user:workshop:updated_at': string;
      'user:workshop:ambassador_check': string;
      'user:workshop:ambassador:id': number;
      'user:workshop:ambassador:firstname': string;
      'user:workshop:ambassador:lastname': string;
      'user:workshop:ambassador:email': string;
      'user:workshop:ambassador:picture': string;
      'user:workshop:ambassador:birthdate': string;
      'user:workshop:ambassador:created_at': string;
      'user:workshop:ambassador:updated_at': string;
      'user:workshop:location:id': number;
      'user:workshop:location:country': string;
      'user:workshop:location:city': string;
      'user:workshop:location:number': string;
      'user:workshop:location:street': string;
      'user:workshop:location:picture': string;
      'user:workshop:location:capacity': number;
      'user:workshop:location:created_at': string;
      'user:workshop:location:updated_at': string;
      'workshop:id': number;
      'workshop:name': string;
      'workshop:type': 'online' | 'on-site';
      'workshop:status': 'pending-review' | 'confirmed';
      'workshop:description': string;
      'workshop:ambassador_id': number;
      'workshop:location_id': number;
      'workshop:occurring_date': string;
      'workshop:created_at': string;
      'workshop:updated_at': string;
      'workshop:ambassador_check': string;
      'workshop:ambassador:id': number;
      'workshop:ambassador:firstname': string;
      'workshop:ambassador:lastname': string;
      'workshop:ambassador:email': string;
      'workshop:ambassador:picture': string;
      'workshop:ambassador:birthdate': string;
      'workshop:ambassador:created_at': string;
      'workshop:ambassador:updated_at': string;
      'workshop:location:id': number;
      'workshop:location:country': string;
      'workshop:location:city': string;
      'workshop:location:number': string;
      'workshop:location:street': string;
      'workshop:location:picture': string;
      'workshop:location:capacity': number;
      'workshop:location:created_at': string;
      'workshop:location:updated_at': string;
    };
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
      'occurring_date': string;
      'created_at': string;
      'updated_at': string;
      'ambassador_check': string;
    };
    nested: {
      'ambassador': Schema['ambassador']['plain'] & Schema['ambassador']['nested'];
      'location': Schema['location']['plain'] & Schema['location']['nested'];
    };
    flat: {
      'ambassador:id': number;
      'ambassador:firstname': string;
      'ambassador:lastname': string;
      'ambassador:email': string;
      'ambassador:picture': string;
      'ambassador:birthdate': string;
      'ambassador:created_at': string;
      'ambassador:updated_at': string;
      'location:id': number;
      'location:country': string;
      'location:city': string;
      'location:number': string;
      'location:street': string;
      'location:picture': string;
      'location:capacity': number;
      'location:created_at': string;
      'location:updated_at': string;
    };
  };
};
