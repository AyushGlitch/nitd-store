import { AtomEffect, atom, useRecoilCallback, useRecoilValue } from 'recoil';

type Theme = 'light' | 'dark';

const localStorageEffect =
    (key: string): AtomEffect<Theme> =>
    ({ setSelf, onSet }) => {
        const stored = localStorage.getItem(key);
        if (stored == 'light' || stored == 'dark') {
            setSelf(stored);
        }

        onSet((newValue, _, isReset) => {
            if (isReset) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, newValue);
            }
        });
    };

export const ThemeAtom = atom<Theme>({
    key: 'theme',
    default: 'dark',
    effects: [localStorageEffect('theme')],
});

export const useTheme = () => {
    return useRecoilValue(ThemeAtom);
};

export const useToggleTheme = () => {
    return useRecoilCallback(
        (ctx) => () => {
            ctx.set(ThemeAtom, (theme) =>
                theme === 'light' ? 'dark' : 'light'
            );
        },
        []
    );
};
