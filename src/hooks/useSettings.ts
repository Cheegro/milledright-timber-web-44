
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const getSetting = (key: string, defaultValue: string = ''): string => {
    const setting = settings.find(s => s.setting_key === key);
    if (!setting) {
      console.warn(`Setting '${key}' not found, using default:`, defaultValue);
      return defaultValue;
    }
    const value = parseSettingValue(setting);
    return typeof value === 'string' ? value : defaultValue;
  };

  const getBooleanSetting = (key: string, defaultValue: boolean = false): boolean => {
    const setting = settings.find(s => s.setting_key === key);
    if (!setting) {
      console.warn(`Setting '${key}' not found, using default:`, defaultValue);
      return defaultValue;
    }
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
