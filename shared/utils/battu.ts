import { Solar } from 'lunar-typescript';
import type { BattuData, Pillar } from '../types/battuTypes';

export function generateBattuData(date: Date): BattuData {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();

  const getPillar = (canChi: string, nạpâm: string, tàngCan: string[], trườngSinh: string): Pillar => {
    const [can, chi] = canChi.split('');
    return {
      can,
      chi,
      nạpâm,
      tàngCan,
      trườngSinh,
    };
  };

  return {
    date,
    solar: `${solar.getYear()}-${solar.getMonth()}-${solar.getDay()}`,
    lunar: `${lunar.getYear()}-${lunar.getMonth()}-${lunar.getDay()}`,
    tiếtKhí: lunar.getJieQi(),
    pillars: {
      year: getPillar(
        lunar.getYearInGanZhi(),
        lunar.getYearNaYin(),
        lunar.getYearHid(),
        lunar.getYearChangSheng()
      ),
      month: getPillar(
        lunar.getMonthInGanZhiExact(),
        lunar.getMonthNaYin(),
        lunar.getMonthHideGanExact(),
        lunar.getMonthChangSheng()
      ),
      day: getPillar(
        lunar.getDayInGanZhi(),
        lunar.getDayNaYin(),
        lunar.getDayHideGan(),
        lunar.getDayChangSheng()
      ),
      hour: getPillar(
        lunar.getTimeInGanZhi(),
        lunar.getTimeNaYin(),
        lunar.getTimeHideGan(),
        lunar.getTimeChangSheng()
      ),
    },
  };
}
