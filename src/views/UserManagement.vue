<template>
    <section class="pageFormat">
        <h1><span>User</span> Management Dashboard </h1>

        <UserTable :users="users" :loading="isLoading" @new="openNewUserModal" @edit="handleEdit"
            @delete="handleDelete" />

        <UserFormModal v-model:visible="isModalOpen" :userToEdit="selectedUser" @save="handleSave" />

        <ConfirmDialog />
        <Toast />

    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import type { IUser } from '@/interfaces/User';
import UserTable from '@/components/users/UserTable.vue';
import UserFormModal from '@/components/users/UserFormModal.vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const userStore = useUserStore();
const { users, isLoading } = storeToRefs(userStore);
const { fetchUsers, addUser, updateUser, removeUser } = userStore;

const confirm = useConfirm();
const toast = useToast();
const isModalOpen = ref<boolean>(false);
const modalTitle = ref<string>('');
const selectedUser = ref<IUser | null>(null);

onMounted(() => {
    fetchUsers();
});

const openNewUserModal = () => {
    isModalOpen.value = true;
    // modalTitle.value = 'New User';
    selectedUser.value = null;
}

const handleEdit = (user: IUser) => {
    isModalOpen.value = true;
    // modalTitle.value = 'Edit User';
    selectedUser.value = user;
}

const handleDelete = (user: IUser) => {
    confirm.require({
        message: `Do you want to delete this user "${user.username}"?`,
        header: 'Delete User',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger',
            icon: 'pi pi-trash'
        },
        accept: () => {
            removeUser(user.id);
            toast.add({ severity: 'info', summary: 'Confirmed', detail: `User ${user.username} deleted`, life: 3000 });
        }
    });
}

const handleSave = (user: IUser) => {
    if (user.id) {
        updateUser(user);
        toast.add({ severity: 'success', summary: 'Updated', detail: `User ${user.username} updated`, life: 3000 });
    } else {
        addUser(user);
        toast.add({ severity: 'success', summary: 'Created', detail: `User ${user.username} created`, life: 3000 });
    }
}

</script>