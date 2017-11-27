// tslint:disable:max-line-length
interface IQualifiers {
  [key: string]: string | boolean | IComparator | void;
  /**
   * The in qualifier limits what fields are searched.
   * With this qualifier you can restrict the search to just the repository name, description, README, or any combination of these.
   * Without the qualifier, only the name and description are searched.
   */
  in?: 'name' | 'description' | 'readme';
  /**
   * The size qualifier finds repositories that match a certain size (in kilobytes), using greater than, less than, and range qualifiers.
   */
  size?: IComparator;
  /**
   * You can filter your search based on whether a repository is private or public.
   */
  is?: 'private' | 'public';
  /**
   * You can search repositories based on whether or not they're a mirror and are hosted elsewhere.
   */
  mirror?: boolean;
  /**
   * You can search repositories based on whether or not they're archived.
   */
  archived?: boolean;
  /**
   * The forks qualifier specifies the number of forks a repository should have, using greater than, less than, and range qualifiers.
   */
  forks?: IComparator;
  /**
   * You can filter repositories based on time of creation or time of last update. For repository creation, you can use the created qualifier; to find out when a repository was last updated, you'll want to use the pushed qualifier. The pushed qualifier will return a list of repositories, sorted by the most recent commit made on any branch in the repository.
   *
   * Both take a date as a parameter. Date formatting must follow the ISO8601 standard, which is YYYY-MM-DD (year-month-day). You can also add optional time information THH:MM:SS+00:00 after the date, to search by the hour, minute, and second. That's T, followed by HH:MM:SS (hour-minutes-seconds), and a UTC offset (+00:00).
   */
  created?: IComparator; // YYYY-MM-DD
  pushed?: IComparator; // YYYY-MM-DD
  /**
   * To grab a list of a user's or organization's repositories, you can use the user or org qualifier.
   */
  user?: string;
  org?: string;
  /**
   * You can find all of the repositories that are classified with a particular topic.
   */
  topic?: string;
  /**
   * You can find repositories by the number of applied topics, using the topics qualifier along with greater than, less than, and range qualifiers.
   */
  topics?: IComparator;
  /**
   * You can search repositories by their license. You must use a license keyword to filter repositories by a particular license or license family.
   */
  license?: string;
  /**
   * You can also search repositories based on what language they're written in.
   */
  language?: string;
  /**
   * You can search repositories based on the number of stars a repository has, using greater than, less than, and range qualifiers
   */
  stars?: IComparator;
  sort?: string;
}

interface IComparator {
  value: string | { start: '*' | number; end: '*' | number };
  operation: 'eq' | 'lt' | 'lte' | 'gt' | 'gte';
}

const addAllComparator = (query: string, qualifiers: IQualifiers): string => {
  let result = query;
  Object.keys(qualifiers).forEach(qualifierKey => {
    const qualifier = qualifiers[qualifierKey];
    if (typeof qualifier === 'object') {
      result = addComparatorQualifier(
        result,
        qualifierKey,
        qualifier as IComparator
      );
    } else {
      if (qualifier && qualifier.toString().trim() !== '') {
        result += ` ${qualifierKey}:${qualifier}`;
      }
    }
  });
  return result;
};

const addComparatorQualifier = (
  query: string,
  qualifier: string,
  comparator: IComparator
): string => {
  let result = query;
  if (typeof comparator.value === 'object') {
    const { start, end } = comparator.value;
    result += ` ${qualifier}:${start}..${end}`;
  } else {
    switch (comparator.operation) {
      case 'gt':
        result += ` ${qualifier}:>${comparator.value}`;
        break;
      case 'gte':
        result += ` ${qualifier}:>=${comparator.value}`;
        break;
      case 'lt':
        result += ` ${qualifier}:<${comparator.value}`;
        break;
      case 'lte':
        result += ` ${qualifier}:<=${comparator.value}`;
        break;
      default:
        result += ` ${qualifier}:${comparator.value}`;
        break;
    }
  }
  return result;
};

const builder = (query: string, qualifiers?: IQualifiers): string => {
  if (!qualifiers) {
    return query;
  }
  return addAllComparator(query, qualifiers).trim();
};

export default builder;
