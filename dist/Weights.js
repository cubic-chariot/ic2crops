/* Utilities for handling weight lists.
 *
 * A weight list is a list of pairs [T, number]
 * where all numbers are nonnegative and their sum is 1.
 */
/* Merges all the given weight lists in a single list,
 * with weights normalized so that they still sum to 1.
 */
export function mergeWeightLists(lists) {
    let merge = new Map();
    for (let list of lists) {
        for (let valueWeightPair of list) {
            let [value, weight] = valueWeightPair;
            if (merge.has(value)) {
                let newWeight = merge.get(value) + weight / lists.length;
                merge.set(value, newWeight);
            }
            else {
                merge.set(value, weight / lists.length);
            }
        }
    }
    return Array.from(merge);
}
