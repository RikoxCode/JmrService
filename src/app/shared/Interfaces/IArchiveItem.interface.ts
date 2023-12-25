export interface IArchiveItem {
  // base informations
  group: string;
  id: number;
  title: string;

  // detailed informations
  komponist: string;
  arrangeur: string;
  verlag: string;
  grad: number;
  flex: number;
  stil: string;
  duration: string;
  auffuehrungs_jahr: string;
  digital_analog: string;
  demo_url: string;
  aufnahme_url: string;
  jmr_aufnahme_url: string;
  jungmusik_fest: number;
  bemerkungen: string;

  // state informations
  created_at: string;
  updated_at: string;
  modified_by: string;
}
