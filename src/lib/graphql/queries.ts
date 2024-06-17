import { gql, type TypedDocumentNode } from "@apollo/client";

type Query<TData> = TypedDocumentNode<{ result: TData }>;

export type QueryData = SpellData | MonsterData | EquipmentData | MagicItemData;

export type SpellData = {
  name: string;
  index: string;
  level: number;
  school: {
    name: string;
    index: string;
  }
}

export const GET_ALL_SPELLS: Query<SpellData[]> = gql`
  query GetAllSpells {
    result: spells(limit: 400) {
      name
      index
      level
      school {
        name
        index
      }
    }
  }
`;

export type MonsterData = {
  index: string;
  name: string;
  type: string;
  challenge_rating: number;
};

export const GET_ALL_MONSTERS: Query<MonsterData[]> = gql`
  query GetAllMonsters {
    result: monsters(limit: 400) {
      index
      name
      type
      challenge_rating
    }
  }
`;

export type MagicItemData = {
  index: string;
  name: string;
  rarity: string;
  equipment_category: {
    name: string;
  };
};

export const GET_ALL_MAGIC_ITEMS: Query<MagicItemData[]> = gql`
  query GetMagicItems {
    result: magicItems(limit: 400) {
      index
      name
      rarity
      equipment_category {
        name
      }
    }
  }
`;

export type EquipmentData = {
  index: string;
  name: string;
  weight: number;
  cost: {
    unit: string;
    quantity: number;
  };
  equipment_category: {
    name: string;
  };
}

export const GET_ALL_EQUIPMENT: Query<EquipmentData[]> = gql`
  query GetAllEquipment {
    result: equipments(limit: 400) {
      index
      name
      weight
      cost {
        quantity
        unit
      }
      equipment_category {
        name
      }
    }
  }
`;

export type RuleData = {
  name: string;
  index: string;
  desc: string;
  subsections: {
    name: string;
    index: string;
    desc: string;
  }[]
}

export const GET_RULE: Query<RuleData> = gql`
  query GetRule($index: String) {
    result: rule(index: $index) {
      name
      index
      desc
      subsections {
        name
        index
        desc
      }
    }
  }
`;