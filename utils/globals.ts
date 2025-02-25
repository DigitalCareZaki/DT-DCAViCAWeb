String.prototype.convertURI = function (internal: boolean = false) {
  if (internal) {
    // dev frontend url
    return `https://avica-web.vercel.app${this.toString()}`;

    // live frontend url
    // return `https://avica-frontend.vercel.app${this.toString()}`;
    // return `https://mobility-health-frontend.vercel.app${this.toString()}`;
    //return `http://localhost:3000${this.toString()}`;
  }

  // live backend url
  // return `https://avica.up.railway.app${this.toString()}`;

  // dev backend url
  
  return `https://avica-dev.up.railway.app${this.toString()}`;
  // return `https://mobility-health-backend-production.up.railway.app${this.toString()}`;
  //return `http://localhost:8080${this.toString()}`;
};

Number.prototype.getWeight = function () {
  return `${this} KG`;
};

Number.prototype.getHeight = function () {
  return `${this} cm`;
};

export function removeHtmlTagsAndDecodeEntities(htmlString: string): string {
  // Regular expression for HTML tags
  const tagRegex = /<[^>]*>/g;

  // Regular expression for character references
  const entityRegex = /&#(\d+);|&#x([a-f\d]+);/gi;

  // Function to decode a character reference
  const decodeEntity = (
    match: string,
    decimal: string | null,
    hex: string | null
  ) => {
    let charCode: number;
    if (decimal) {
      charCode = parseInt(decimal, 10);
    } else {
      charCode = parseInt(hex ?? '0', 16);
    }
    return String.fromCharCode(charCode);
  };

  // Remove HTML tags
  let contentWithoutTags = htmlString.replace(tagRegex, '');

  // Decode character references
  contentWithoutTags = contentWithoutTags.replace(entityRegex, decodeEntity);

  // Trim any leading or trailing whitespace
  return contentWithoutTags.trim();
}

String.prototype.trimHTML = function () {
  const tagRegex = /<[^>]*>/g;

  // Regular expression for character references
  const entityRegex = /&#(\d+);|&#x([a-f\d]+);/gi;

  // Function to decode a character reference
  const decodeEntity = (
    match: string,
    decimal: string | null,
    hex: string | null
  ) => {
    let charCode: number;
    if (decimal) {
      charCode = parseInt(decimal, 10);
    } else {
      charCode = parseInt(hex ?? '0', 16);
    }
    return String.fromCharCode(charCode);
  };

  // Remove HTML tags
  let contentWithoutTags = this.replace(tagRegex, '');

  // Decode character references
  contentWithoutTags = contentWithoutTags.replace(entityRegex, decodeEntity);

  // Trim any leading or trailing whitespace
  return contentWithoutTags.trim();
};

export const getName = ({
  first_name,
  middle_name,
  last_name,
}: {
  first_name: string;
  middle_name: string | undefined | null;
  last_name: string;
}): string => {
  let name = '';
  if (first_name?.length) name = `${first_name}`;
  if (middle_name?.length) name = `${name} ${middle_name}`;
  if (last_name?.length) name = `${name} ${last_name}`;

  return name;
};

export const getProfilePicture = (uri: string | undefined | null) => {
  if (!uri) {
    return 'https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708387200&semt=ais';
  }

  return uri;
};

let timeoutid: NodeJS.Timeout | undefined = undefined;

export const debounce = (callback: (props: any) => void, timer: number) => {
  return (...props: any) => {
    if (timeoutid) {
      clearTimeout(timeoutid);
    }

    timeoutid = setTimeout(() => {
      callback.call(this, props);
    }, timer);
  };
};

export const generateDates = (value: number = 10): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date();

  for (let i = 0; i < value; i++) {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + i);
    newDate.setHours(0, 0, 0, 0);
    dates.push(newDate);
  }

  return dates;
};

export const createHours = (startTime: string): Date => {
  const [time, period] = startTime.split(/(?=[ap]m)/i);
  const [hours, minutes] = time.split(':');

  const date = new Date();
  let hour = parseInt(hours, 10);

  if (period.toLowerCase() === 'pm' && hour !== 12) {
    hour += 12;
  } else if (period.toLowerCase() === 'am' && hour === 12) {
    hour = 0;
  }

  date.setHours(hour, parseInt(minutes, 10), 0, 0);
  return date;
};

export function generateRandomNumber(limit: number = 6): number {
  return Math.floor(Math.random() * limit) + 1;
}

export function timeAgo(timestamp: number): string {
  const now = Date.now();
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
      return count === 1
        ? `1 ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }

  return 'just now';
}

export function getFileExtension(uri: string | undefined) {
  return uri?.split('.').at(-1)?.toLowerCase().toString() ?? '';
}
