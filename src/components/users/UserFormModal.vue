<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal class="userModal">

        <template #header>
            <h4>{{ title }}</h4>
        </template>

        <div class="container">
            <div class="field">
                <label for="name">Name:</label>
                <InputText id="name" v-model="name" v-bind="nameAttrs" :invalid="errors.name != null" autocomplete="off"
                    fluid />
                <small class="error-msg" v-if="errors.name">{{ errors.name }}</small>
            </div>

            <div class="field">
                <label for="username">Username:</label>
                <InputText id="username" v-model="username" v-bind="usernameAttrs" :invalid="errors.username != null"
                    autocomplete="off" fluid />
                <small class="error-msg" v-if="errors.username">{{ errors.username }}</small>
            </div>

            <div class="field">
                <label for="email">Email:</label>
                <InputText id="email" v-model="email" v-bind="emailAttrs" :invalid="errors.email != null"
                    autocomplete="off" fluid />
                <small class="error-msg" v-if="errors.email">{{ errors.email }}</small>
            </div>

            <div class="field">
                <label for="phone">Phone:</label>
                <InputText id="phone" v-model="phone" v-bind="phoneAttrs" :invalid="errors.phone != null"
                    autocomplete="off" fluid />
                <small class="error-msg" v-if="errors.phone">{{ errors.phone }}</small>
            </div>

        </div>

        <template #footer>
            <Button label="Cancel" severity="secondary" @click="closeModal" />
            <Button label="Save" icon="pi pi-save" @click="onSubmit" />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useUserStore } from '@/stores/user';
import { createUserSchema } from '@/validations/userValidation';

const props = defineProps<{
    visible: boolean;
    userToEdit?: any | null;
    // title: string;
}>();

const emit = defineEmits(['update:visible', 'save']);

const title = computed(() => props.userToEdit ? 'Edit User' : 'New User');

const userStore = useUserStore();

const validationSchema = computed(() => {
    return toTypedSchema(
        createUserSchema(
            userStore.users,
            props.userToEdit?.id
        )
    );
});

const { defineField, handleSubmit, errors, setValues, resetForm } = useForm({
    validationSchema,
    initialValues: {
        name: '',
        username: '',
        email: '',
        phone: ''
    }
});

const [name, nameAttrs] = defineField('name');
const [username, usernameAttrs] = defineField('username');
const [email, emailAttrs] = defineField('email');
const [phone, phoneAttrs] = defineField('phone');

watch(
    [() => props.userToEdit, () => props.visible],
    ([newUser, isVisible]) => {
        if (isVisible) {
            if (newUser) {
                setValues({
                    name: newUser.name,
                    username: newUser.username,
                    email: newUser.email,
                    phone: newUser.phone
                });
            } else {
                resetForm();
            }
        }
    },
    { immediate: true }
);

const closeModal = () => {
    emit('update:visible', false);
};

const onSubmit = handleSubmit((values) => {
    if (props.userToEdit) {
        const id = props.userToEdit.id;
        const user = {
            id: id,
            ...values
        };
        emit('save', user);
        closeModal();
    } else {
        emit('save', values);
        closeModal();
    }
});
</script>