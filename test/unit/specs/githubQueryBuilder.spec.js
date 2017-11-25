import githubQueryBuilder from '@/graphql/githubQueryBuilder';

describe('githubQueryBuilder', () => {
  describe('without qualifiers', () => {
    it('should return the input query', () => {
      const result = githubQueryBuilder('ossfinder');
      expect(result).toBe('ossfinder');
    });
  });
  describe('with single qualifier', () => {
    it('should return with "in:name" qualifier', () => {
      const result = githubQueryBuilder('ossfinder', { in: 'name' });
      expect(result).toBe('ossfinder in:name');
    });
    it('should return with "size:5" qualifier', () => {
      const result = githubQueryBuilder('ossfinder', { size: { value: 5, operation: 'eq' } });
      expect(result).toBe('ossfinder size:5');
    });
    it('should return with "size:<5" qualifier', () => {
      const result = githubQueryBuilder('ossfinder', { size: { value: 5, operation: 'lt' } });
      expect(result).toBe('ossfinder size:<5');
    });
    it('should return with "topics:<=3" qualifier', () => {
      const result = githubQueryBuilder('ossfinder', { topics: { value: '3', operation: 'lte' } });
      expect(result).toBe('ossfinder topics:<=3');
    });
    it('should return with "star:>100" qualifier', () => {
      const result = githubQueryBuilder('ossfinder', { star: { value: 100, operation: 'gt' } });
      expect(result).toBe('ossfinder star:>100');
    });
    it('should return with "created:>=2011-01-01" qualifier', () => {
      const result = githubQueryBuilder('ossfinder', { created: { value: '2011-01-01', operation: 'gte' } });
      expect(result).toBe('ossfinder created:>=2011-01-01');
    });
    it('should return with "size:5..10" qualifier', () => {
      const result = githubQueryBuilder('ossfinder', { size: { value: { start: 5, end: 10 } } });
      expect(result).toBe('ossfinder size:5..10');
    });
    it('should return with "mirror:true" qualifier', () => {
      const result = githubQueryBuilder('ossfinder', { mirror: true });
      expect(result).toBe('ossfinder mirror:true');
    });
  });
  describe('with multiple qualifiers', () => {
    it('should return with "in:name size:>5" qualifier', () => {
      const result = githubQueryBuilder(
        'ossfinder',
        { in: 'name', size: { value: 5, operation: 'gt' } },
      );
      expect(result).toBe('ossfinder in:name size:>5');
    });
  });
});
