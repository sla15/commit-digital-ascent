import { useState, useEffect } from 'react';
import { supabase } from '../src/integrations/supabase/client';

export interface SiteContentMap {
  [key: string]: any;
}

export function useSiteContent(section: string) {
  const [content, setContent] = useState<SiteContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('key, content')
        .eq('section', section);

      if (!error && data) {
        const map: SiteContentMap = {};
        data.forEach((row: any) => {
          map[row.key] = row.content;
        });
        setContent(map);
      }
      setLoading(false);
    };

    fetchContent();
  }, [section]);

  return { content, loading };
}

export function useAllSiteContent() {
  const [content, setContent] = useState<Record<string, SiteContentMap>>({});
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_content')
      .select('section, key, content, updated_at');

    if (!error && data) {
      const map: Record<string, SiteContentMap> = {};
      data.forEach((row: any) => {
        if (!map[row.section]) map[row.section] = {};
        map[row.section][row.key] = row.content;
      });
      setContent(map);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  return { content, loading, refetch: fetchAll };
}
