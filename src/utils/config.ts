import { packageDirectory } from 'pkg-dir';
import { cosmiconfig } from 'cosmiconfig';
import type { SyncIndexOptions } from '~/types/options.js';

export const defaultConfig: SyncIndexOptions = {
	folders: [],
	watch: false,
	skipInitial: false,
	verbose: false,
	exportExtensions: true,
	indexExtension: '.ts',
};

export async function getConfigOptions(): Promise<SyncIndexOptions> {
	const searchDir = await packageDirectory();
	const explorer = cosmiconfig('sync-index', {
		stopDir: searchDir,
	});

	const results = await explorer.search(searchDir);
	const config = results?.config as SyncIndexOptions;

	return { ...defaultConfig, ...config };
}
