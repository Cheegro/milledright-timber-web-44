
import { useQuery } from '@tanstack/react-query';
import { fetchSettings, parseSettingValue, type SiteSetting } from '@/api/settingsApi';

export const useSettings = () => {
  const {
    data: settings = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  });

  const getSetting = (key: string, defaultValue: string = ''): string => {
    const setting = settings.find(s => s.setting_key === key);
    if (!setting) return defaultValue;
    const value = parseSettingValue(setting);
    return typeof value === 'string' ? value : defaultValue;
  };

  const getBooleanSetting = (key: string, defaultValue: boolean = false): boolean => {
    const setting = settings.find(s => s.setting_key === key);
    if (!setting) return defaultValue;
    const value = parseSettingValue(setting);
    return typeof value === 'boolean' ? value : defaultValue;
  };

  return {
    settings,
    getSetting,
    getBooleanSetting,
    isLoading,
    error,
    refetch
  };
};
