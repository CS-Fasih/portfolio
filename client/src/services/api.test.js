import { describe, it, expect, vi, afterEach } from 'vitest';
import api, { fetchGitHubRepos } from './api.js';

describe('fetchGitHubRepos', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns repos array on success', async () => {
        const mockRepos = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];
        vi.spyOn(api, 'get').mockResolvedValue({ data: { data: mockRepos } });

        const result = await fetchGitHubRepos();

        expect(api.get).toHaveBeenCalledWith('/api/github/repos');
        expect(result).toEqual(mockRepos);
    });

    it('returns empty array if response data.data is undefined', async () => {
        vi.spyOn(api, 'get').mockResolvedValue({ data: {} });

        const result = await fetchGitHubRepos();

        expect(api.get).toHaveBeenCalledWith('/api/github/repos');
        expect(result).toEqual([]);
    });

    it('returns empty array and logs error on failure', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.spyOn(api, 'get').mockRejectedValue(new Error('Network Error'));

        const result = await fetchGitHubRepos();

        expect(api.get).toHaveBeenCalledWith('/api/github/repos');
        expect(result).toEqual([]);
        expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch repos:', 'Network Error');
    });
});
