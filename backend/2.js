function solution(seconds) {
    // You must complete the logic for the function that is provided
    // before compiling or submitting to avoid an error.

    // Write your code here
    if (seconds === 0) return 'now';

    const units = [
        { name: 'year', seconds: 365 * 24 * 60 * 60 },
        { name: 'day', seconds: 24 * 60 * 60 },
        { name: 'hour', seconds: 60 * 60 },
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 }
    ];

    let remaining = seconds;
    const components = [];

    for (const unit of units) {
        const count = Math.floor(remaining / unit.seconds);
        if (count > 0) {
            components.push({ value: count, name: unit.name });
            remaining -= count * unit.seconds;
        }
    }

    const parts = components.map(c => `${c.value} ${c.name}${c.value !== 1 ? 's' : ''}`);

    if (parts.length === 1) {
        return parts[0];
    } else if (parts.length === 2) {
        return parts.join(' and ');
    } else {
        return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
    }

}