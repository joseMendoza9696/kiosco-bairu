import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import gql from 'graphql-tag';

const PROFILE_QUERY = gql`
  query {
    KIOSCO_getPerfilActivo {
      id
      contextStyle {
        colors {
          primary
          secondary
          tertiary
          quartiary
        }
        logo
      }
    }
  }
`;

export const Home = () => {
  const [customColors, setCustomColors] = useState({
    primary: '',
    secondary: '',
    tertiary: '',
    quartiary: '',
  });
  const [profileData, setProfileData] = useState<any>(null);

  const { loading, error, data } = useQuery(PROFILE_QUERY);

  useEffect(() => {
    if (data && data.KIOSCO_getPerfilActivo) {
      setProfileData(data.KIOSCO_getPerfilActivo);
      const contextStyle = data.KIOSCO_getPerfilActivo.contextStyle;
      const colors = contextStyle.colors;
      setCustomColors(colors);
    }
  }, [data]);

  console.log('profileData', profileData);
  return (
    <div className={`bg-${customColors.primary}`}>
      <h1>Home</h1>
      <p className="text-white">Welcome to the Home page</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {profileData && (
        <div>
          <p className={`text-${customColors.quartiary}`}>
            Profile Name: {profileData.id}
          </p>
        </div>
      )}
    </div>
  );
};
