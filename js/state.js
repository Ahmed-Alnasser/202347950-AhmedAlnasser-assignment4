// ============================================
// STATE MANAGEMENT: AppState + collapsible sections
//
// Single source of truth for UI state that survives reloads.
// Every mutation goes through AppState.set(), which persists to
// localStorage and notifies subscribers — classic pub/sub pattern.
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const AppState = {
        STORAGE_KEY: 'portfolioState',
        state: { collapsedSections: [] },
        subscribers: [],

        load() {
            try {
                const raw = localStorage.getItem(this.STORAGE_KEY);
                if (raw) Object.assign(this.state, JSON.parse(raw));
            } catch (e) { /* corrupted JSON or privacy mode */ }
        },
        save() {
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
            } catch (e) { /* quota / privacy mode */ }
        },
        get(key) { return this.state[key]; },
        set(key, value) {
            this.state[key] = value;
            this.save();
            this.subscribers.forEach((fn) => fn(this.state));
        },
        subscribe(fn) {
            this.subscribers.push(fn);
            fn(this.state); // fire immediately
        },

        isCollapsed(id) { return this.state.collapsedSections.includes(id); },
        setCollapsed(id, collapsed) {
            const list = this.state.collapsedSections.filter((x) => x !== id);
            if (collapsed) list.push(id);
            this.set('collapsedSections', list);
        },
        collapseAll(ids) { this.set('collapsedSections', [...ids]); },
        expandAll()      { this.set('collapsedSections', []); },
    };
    AppState.load();

    // Build collapsible UI for each section, driven by AppState
    const sectionIds = [];
    document.querySelectorAll('main section').forEach((section) => {
        const heading = section.querySelector('h2');
        if (!heading) return; // skip hero (no h2)

        sectionIds.push(section.id);

        const headingWrapper = document.createElement('div');
        headingWrapper.className = 'section-heading-wrapper';
        section.insertBefore(headingWrapper, heading);
        headingWrapper.appendChild(heading);

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'section-content';
        const inner = document.createElement('div');
        inner.className = 'section-content-inner';
        contentWrapper.appendChild(inner);
        while (headingWrapper.nextSibling) {
            inner.appendChild(headingWrapper.nextSibling);
        }
        section.appendChild(contentWrapper);

        heading.classList.add('collapsible');
        heading.setAttribute('role', 'button');
        heading.setAttribute('tabindex', '0');
        const chevron = document.createElement('span');
        chevron.className = 'collapse-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        chevron.textContent = '▾';
        heading.appendChild(chevron);

        const toggle = () => AppState.setCollapsed(section.id, !AppState.isCollapsed(section.id));
        heading.addEventListener('click', toggle);
        heading.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });

    // Re-render sections whenever collapsed-state changes
    AppState.subscribe((state) => {
        sectionIds.forEach((id) => {
            const section = document.getElementById(id);
            if (!section) return;
            const collapsed = state.collapsedSections.includes(id);
            section.classList.toggle('collapsed', collapsed);
            const heading = section.querySelector('h2.collapsible');
            if (heading) heading.setAttribute('aria-expanded', String(!collapsed));
        });
    });

    // "Collapse All / Expand All" header button
    const sectionsToggle = document.getElementById('sections-toggle');
    AppState.subscribe((state) => {
        const allCollapsed = sectionIds.length > 0 &&
            sectionIds.every((id) => state.collapsedSections.includes(id));
        sectionsToggle.textContent = allCollapsed ? 'Expand All ⇣' : 'Collapse All ⇡';
        sectionsToggle.setAttribute('aria-label', allCollapsed ? 'Expand all sections' : 'Collapse all sections');
    });
    sectionsToggle.addEventListener('click', () => {
        const allCollapsed = sectionIds.every((id) => AppState.isCollapsed(id));
        if (allCollapsed) AppState.expandAll();
        else              AppState.collapseAll(sectionIds);
    });
});
