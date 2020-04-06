export class Fecha {
  static DateToYYYYMMDD(Date: Date): string {
    let DS: string = Date.getFullYear() + '-' + ('0' + (Date.getMonth() + 1)).slice(-2) + '-' + ('0' + Date.getDate()).slice(-2) + 'T00:00';
    return DS;
  }

  static YYYYMMDD(Date: Date): string {
    let DS: string = Date.getFullYear() + '-' + ('0' + (Date.getMonth() + 1)).slice(-2) + '-' + ('0' + Date.getDate()).slice(-2);
    return DS;
  }
}
