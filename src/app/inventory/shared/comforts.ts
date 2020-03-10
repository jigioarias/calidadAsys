export interface Comfort {
  code: string;
  description: string;
  priority: number;
  icon?: string;
}

const wifi: Comfort = {
  code: 'wifi',
  description: 'Wifi',
  priority: 1,
  icon: 'wifi'
};

const tv: Comfort = {
  code: 'tv',
  description: 'Televisión',
  priority: 1,
  icon: 'tv'
};

export const COMFORTS: Comfort[] = [wifi, tv];
