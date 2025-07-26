import { Button } from 'flowbite-react';
import { Link } from 'react-router';

const FormActions = ({ submitLabel = 'Submit', cancelPath = '/', disabled = false }) => {
  return (
    <div className="col-span-9 flex items-center gap-[1rem]">
      <Button type="submit" color="primary" disabled={disabled}>
        {submitLabel}
      </Button>
      <Button type="button" color="error" disabled={disabled}>
        <Link to={cancelPath} style={{ color: 'inherit', textDecoration: 'none' }}>
          Cancel
        </Link>
      </Button>
    </div>
  );
};

export default FormActions;
