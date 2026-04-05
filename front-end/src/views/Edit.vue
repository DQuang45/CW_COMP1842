<template>
    <div>
        <h1>Edit Helpdesk Entry</h1>
    <word-form @createOrUpdate="createOrUpdate" :word="word"></word-form>
    </div>
</template>

<script>
import { api } from '@/helpers/helpers';
import WordForm from '@/components/WordForm.vue';

export default {
    name: 'Edit',
    components: { 
        'word-form' : WordForm
    },
    data: function() {
        return {
            word: {}
        }
    },
    async mounted() {
        this.word = await api.getwords(this.$route.params.id);
    },
    methods: {
        createOrUpdate: async function(word) {
            await api.updateWord(word);
            this.flash('Word updated successfully!', 'success');
            this.$router.push(`/words/${word._id}`);
        }
    }
};
</script>