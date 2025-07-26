import customTheme from 'src/utils/theme/custom-theme';
import { Flowbite } from 'flowbite-react';
import { Outlet } from 'react-router';
import ScrollToTop from 'src/components/shared/ScrollToTop';

const FrontendLayout = () => (
  <>
    <div className="frontend-page bg-white dark:bg-dark">
      <Flowbite theme={{ theme: customTheme }}>
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </Flowbite>
    </div>
  </>
);

export default FrontendLayout;
