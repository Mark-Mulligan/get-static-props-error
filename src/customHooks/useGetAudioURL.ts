// React
import { useMemo } from "react";

const useGetAudioURL = (audioURL: string) => {
  const fullAudioURL = useMemo(() => {
    return `https://iofiaikbqvilxwdhvxti.supabase.co/storage/v1/object/public/${audioURL}`;
  }, [audioURL]);

  return fullAudioURL;
};

export default useGetAudioURL;
