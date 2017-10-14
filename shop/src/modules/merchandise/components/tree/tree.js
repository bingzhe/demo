export const Tree = {

    /**
     * generate key 0-1-2
     * @param {Object} treeData
     * @param {String} parentKey
     * @returns {Array}
     */
    generateKey(treeData = [], parentKey) {
        treeData = treeData.map((item, i) => {
            item.key = parentKey + '-' + i.toString();

            if (item.hasOwnProperty('list') && item.list.length > 0) {
                this.generateKey(item.list, item.key);
            }

            return item;
        });

        return treeData;
    }
};