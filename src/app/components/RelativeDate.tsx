import React from 'react';

interface RelativeDateProps {
  dateString: string ;
}

const RelativeDate: React.FC<RelativeDateProps> = ({ dateString }) => {
  const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const timeDifferenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return 'Just now';
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes}m ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours}h ago`;
    } else if (timeDifferenceInSeconds < 172800) {
      return 'Yesterday';
    } else {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
  };

  return <span>{formatRelativeDate(dateString)}</span>;
}

export default RelativeDate;