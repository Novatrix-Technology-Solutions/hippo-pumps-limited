<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    teamMember: {
        type: Object,
        default: () => ({
            name: '',
            position: '',
            order: 0,
            image: null,
            image_url: null
        })
    },
    isEdit: {
        type: Boolean,
        default: false
    }
});

const form = useForm({
    name: props.teamMember.name,
    position: props.teamMember.position,
    order: props.teamMember.order,
    image: null
});

const imagePreview = ref(props.teamMember.image_url);

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const submit = () => {
    if (props.isEdit) {
        form.put(route('admin.team-members.update', props.teamMember.id));
    } else {
        form.post(route('admin.team-members.store'));
    }
};
</script>

<template>
    <Head :title="isEdit ? 'Edit Team Member' : 'Create Team Member'" />

    <AdminLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {{ isEdit ? 'Edit Team Member' : 'Create Team Member' }}
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <form @submit.prevent="submit" class="space-y-6">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    v-model="form.name"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                <div v-if="form.errors.name" class="text-red-500 text-sm mt-1">
                                    {{ form.errors.name }}
                                </div>
                            </div>

                            <div>
                                <label for="position" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Position
                                </label>
                                <input
                                    type="text"
                                    id="position"
                                    v-model="form.position"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                <div v-if="form.errors.position" class="text-red-500 text-sm mt-1">
                                    {{ form.errors.position }}
                                </div>
                            </div>

                            <div>
                                <label for="order" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Order
                                </label>
                                <input
                                    type="number"
                                    id="order"
                                    v-model="form.order"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                <div v-if="form.errors.order" class="text-red-500 text-sm mt-1">
                                    {{ form.errors.order }}
                                </div>
                            </div>

                            <div>
                                <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    @change="handleImageChange"
                                    accept="image/*"
                                    class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100
                                        dark:file:bg-indigo-900 dark:file:text-indigo-300"
                                />
                                <div v-if="form.errors.image" class="text-red-500 text-sm mt-1">
                                    {{ form.errors.image }}
                                </div>
                                <div v-if="imagePreview" class="mt-2">
                                    <img
                                        :src="imagePreview"
                                        alt="Preview"
                                        class="h-32 w-32 object-cover rounded-lg"
                                    />
                                </div>
                            </div>

                            <div class="flex items-center justify-end">
                                <button
                                    type="submit"
                                    class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                    :disabled="form.processing"
                                >
                                    {{ isEdit ? 'Update' : 'Create' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template> 