import firebase, {db} from './config';

export const addDocument = (collection, data) =>{
      const query = db.collection(collection);

      query.add({
            ...data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
}
// create keywords for displayName, use for search
export const generateKeywords = (displayName) => {
      // set all the functions. eg: name = ["David", "Val", "Teo"]
      // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
      const name = displayName.split(' ').filter((word) => word);

      const length = name.length;
      let flagArray = [];
      let result = [];
      let stringArray = [];

      /**
       *when I have false flag
       * Use the name to see the value
       * This earphone can be used
       * or sour
       **/
      for (let i = 0; i < length; i++) {
            flagArray[i] = false;
      }

      const createKeywords = (name) => {
            const arrName = [];
            let curName = '';
            name.split('').forEach((letter) => {
                  curName += letter;
                  arrName.push(curName);
            });
            return arrName;
      };

      function findPermutation(k) {
            for (let i = 0; i < length; i++) {
                  if (!flagArray[i]) {
                        flagArray[i] = true;
                        result[k] = name[i];

                        if (k === length - 1) {
                              stringArray.push(result.join(' '));
                        }

                        findPermutation(k + 1);
                        flagArray[i] = false;
                  }
            }
      }

      findPermutation(0);

      const keywords = stringArray.reduce((acc, cur) => {
            const words = createKeywords(cur);
            return [...acc, ...words];
      }, []);

      return keywords;
};