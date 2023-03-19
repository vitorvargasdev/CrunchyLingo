interface ExtendedNavigator extends Navigator {
  userLanguage?: string;
  browserLanguage?: string;
  systemLanguage?: string;
}

export const getLanguage = (): string => {
  const { userLanguage, languages, language, browserLanguage, systemLanguage } = navigator as ExtendedNavigator

  return (
    userLanguage ||
    (Array.isArray(languages) && languages && languages[0]) ||
    language ||
    browserLanguage ||
    systemLanguage ||
    'en'
  )
}
