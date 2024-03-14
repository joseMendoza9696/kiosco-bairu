import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const PROFILE_COLORS = gql`
  query {
    KIOSCO_getPerfilActivo {
      id
      contextStyle {
        colors {
          primary
          secondary
          tertiary
          quartiary
          base100
        }
      }
    }
  }
`;
interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  quartiary: string;
  base100: string;
}

export const CustomColors = () => {
  const { loading, error, data } = useQuery(PROFILE_COLORS);
  const [themeColors, setThemeColors] = useState<ThemeColors | null>(null);
  useEffect(() => {
    if (data && data.KIOSCO_getPerfilActivo) {
      const colors: ThemeColors =
        data.KIOSCO_getPerfilActivo.contextStyle.colors;
      setThemeColors(colors);
    }
  }, [data]);

  if (themeColors) {
    return (
      <div className="hidden">
        <style>{`
          :root {
            --color-primary: ${themeColors.primary};
            --color-secondary: ${themeColors.secondary};
            --color-tertiary: ${themeColors.tertiary};
            --color-quartinary: ${themeColors.quartiary};
            --color-base-100: ${themeColors.base100};
          }
        `}</style>
      </div>
    );
  } else if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error: {error.message}</p>;
  } else {
    return <p>No hay temas disponibles </p>;
  }
};
