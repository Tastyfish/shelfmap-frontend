import { plainAxios, secureAxios } from '@/api/backend'

export interface SiteInfo {
  'site_name': string;
  'account_creation_enabled?': boolean;
  'map_name': string;
}

export function readSiteInfo (): Promise<SiteInfo> {
  return plainAxios.get('/api/v1/site')
    .then(response => response.data as SiteInfo)
}

export function updateSiteInfo (info: Partial<SiteInfo>): Promise<SiteInfo> {
  return secureAxios.patch('/api/v1/site', info)
    .then(response => response.data as SiteInfo)
}
