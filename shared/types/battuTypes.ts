export interface Pillar {
  can: string;
  chi: string;
  element?: string; // ngũ hành
  nạpâm?: string;
  tàngCan?: string[];
  trườngSinh?: string;
  thầnSát?: string[];
}

export interface BattuData {
  date: Date;
  solar: string;
  lunar: string;
  tiếtKhí?: string;
  pillars: {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour: Pillar;
  };
}
