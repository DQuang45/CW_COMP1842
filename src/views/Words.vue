<template>
    <div>
        <h1>Helpdesk Response Library</h1>
        
        <div class="ui segment secondary">
            <div class="ui form">
                <div class="inline field">
                    <label>Admin Token:</label>
                    <input 
                        type="password" 
                        v-model="secretToken" 
                        @input="verifyToken" 
                        placeholder="Enter Admin Token..."
                    >
                    <span v-if="currentUserRole === 'admin'" style="color: green; margin-left: 10px;">
                        <i class="check circle icon"></i> Admin Access Granted
                    </span>
                </div>
            </div>
        </div>

        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th>Issue Code</th>
                    <th>Response</th>
                    <th>Category</th>
                    <th>Show</th>
                    <th>Edit</th>
                    <th v-if="currentUserRole === 'admin'">Destroy</th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="word in words" :key="word._id">
                    <td>{{ word.key }}</td>
                    <td>{{ word.value }}</td>
                    <td>{{ word.category }}</td>
                    
                    <td width="75" class="center aligned">
                        <router-link :to="{name: 'show', params:{ id: word._id}}">Show</router-link> 
                    </td>
                    
                    <td width="75" class="center aligned">
                        <router-link :to="{name: 'edit', params:{ id: word._id}}">Edit</router-link>
                    </td>
                    
                    <td width="75" class="center aligned" v-if="currentUserRole === 'admin'">
                        <a href="#" @click.prevent="onDestroy(word._id)">Destroy</a>
                    </td>                  
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { api } from '@/helpers/helpers';

export default {
    name: 'words',
    data() {
        return {
            words: [],
            currentUserRole: 'user',
            secretToken: '',
            CORRECT_TOKEN: 'admin123' 
        }
    },
    async mounted() {
        // download all words when component is mounted
        this.words = await api.getWords();
        
        // check correct token in localStorage 
        const savedToken = localStorage.getItem('admin_token');
        if (savedToken === this.CORRECT_TOKEN) {
            this.secretToken = savedToken;
            this.currentUserRole = 'admin';
        }
    },
    methods: {
        verifyToken() {
            // run verification every time user types in the input
            if (this.secretToken === this.CORRECT_TOKEN) {
                this.currentUserRole = 'admin';
                localStorage.setItem('admin_token', this.secretToken); // save token to localStorage for persistence
            } else {
                this.currentUserRole = 'user';
                localStorage.removeItem('admin_token');
            }
        },
        async onDestroy(id) {
            const sure = window.confirm('Are you sure you want to delete this word?');
            if (!sure) return; 
            
            try {
                await api.deleteWord(id);
                this.flash('Word deleted successfully!', 'success');
                this.words = this.words.filter(word => word._id !== id);
            } catch (error) {
                console.error("Lỗi khi xoá:", error);
            }
        }
    }
}
</script>

<style scoped>
.ui.segment.secondary {
    margin-bottom: 20px;
    background-color: #f3f4f5;
}
</style>