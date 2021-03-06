﻿module App.Combat {
    export enum WeaponType {
        NORMAL,
        AUTOMATIC
    }

    export enum WeaponMode {
        SEMI_AUTOMATIC,
        AUTOMATIC
    }

    function getAmmoType(weaponType: WeaponType): BulletType {
        switch (weaponType) {
            case WeaponType.NORMAL:
            case WeaponType.AUTOMATIC:
            default:
                return BulletType.NORMAL;
        }
    }

    function getWeaponMesh(weaponType: WeaponType): THREE.Mesh {
        var weaponMesh: THREE.Mesh;

        switch (weaponType) {
            case WeaponType.AUTOMATIC:
            case WeaponType.NORMAL:
            default:
                var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
                var material = new THREE.MeshBasicMaterial({ color: 0xbbbbbb });
                weaponMesh = new THREE.Mesh(geometry, material);
        }

        return weaponMesh;
    }

    class WeaponSetting {
        weaponMode: WeaponMode;
        constructor(weaponMode: WeaponMode) {
            this.weaponMode = weaponMode;
        }
    }

    function getWeaponSettings(weaponType: WeaponType): WeaponSetting {
        switch (weaponType) {
            case WeaponType.AUTOMATIC:
                return new WeaponSetting(WeaponMode.AUTOMATIC);
            case WeaponType.NORMAL:
            default:
                return new WeaponSetting(WeaponMode.SEMI_AUTOMATIC);
        }
    }

    export class Weapon {
        weaponType: WeaponType;
        ammoType: BulletType;
        mesh: THREE.Mesh;
        updatePosition: (camera: THREE.Camera) => void;
        settings: WeaponSetting;
        constructor(weaponType: WeaponType, weaponMesh: THREE.Mesh, weaponSettings: WeaponSetting) {
            var self = this;
            this.weaponType = weaponType;
            this.ammoType = getAmmoType(weaponType);
            this.mesh = weaponMesh;
            this.settings = weaponSettings;
        }
    }

    export function createWeaponType(weaponType: WeaponType) {
        var weapon = new Weapon(weaponType, getWeaponMesh(weaponType), getWeaponSettings(weaponType));
        return weapon;
    }

    export function addWeaponTypeToMe(weaponType: WeaponType, scene: THREE.Scene, camera: THREE.Camera) {
        var weapon = new Weapon(weaponType, getWeaponMesh(weaponType), getWeaponSettings(weaponType));
        camera.add(weapon.mesh);
        weapon.mesh.position.set(0.25, -0.15, -0.25);
        scene.add(camera);
        return weapon;
    }
}